// backend/src/controllers/jobsController.js
import { supabaseAdmin } from '../config/supabase.js';
import { sendSuccess, sendError } from '../utils/response.js';

const PAGE_SIZE = 12;

// ── GET /api/jobs ─────────────────────────────────────────────────
// Query params: type, search, page
export const getAllJobs = async (req, res, next) => {
  try {
    const { type, search, page = '1' } = req.query;
    const pageNumber = Math.max(1, parseInt(page) || 1);
    const from = (pageNumber - 1) * PAGE_SIZE;
    const to   = from + PAGE_SIZE - 1;

    let query = supabaseAdmin
      .from('jobs')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(from, to);

    // Filter by job type
    if (type && ['Remote', 'On-site', 'Hybrid'].includes(type)) {
      query = query.eq('type', type);
    }

    // Full-text search across title, company, location, description
    if (search && search.trim().length > 0) {
      const sanitized = search.trim().replace(/[^\w\s]/g, '');
      // Use ilike for flexible matching
      query = query.or(
        `title.ilike.%${sanitized}%,company.ilike.%${sanitized}%,location.ilike.%${sanitized}%,description.ilike.%${sanitized}%`
      );
    }

    const { data: jobs, error, count } = await query;

    if (error) throw error;

    const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

    return sendSuccess(res, 200, 'Jobs fetched successfully.', jobs, {
      total:       count || 0,
      page:        pageNumber,
      pageSize:    PAGE_SIZE,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPrevPage: pageNumber > 1,
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/jobs/:id ─────────────────────────────────────────────
export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Basic UUID format check
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return sendError(res, 400, 'Invalid job ID format.');
    }

    const { data: job, error } = await supabaseAdmin
      .from('jobs')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url,
          email
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error || !job) {
      return sendError(res, 404, 'Job not found or is no longer active.');
    }

    return sendSuccess(res, 200, 'Job fetched successfully.', job);
  } catch (err) {
    next(err);
  }
};

// ── POST /api/jobs ────────────────────────────────────────────────
// Requires auth (req.user must be set by requireAuth middleware)
export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      company,
      location,
      type,
      description,
      salary_range,
      tags,
      apply_url,
    } = req.body;

    const userId = req.user.id;

    const { data: job, error } = await supabaseAdmin
      .from('jobs')
      .insert({
        title:        title.trim(),
        company:      company.trim(),
        location:     location.trim(),
        type,
        description:  description.trim(),
        salary_range: salary_range?.trim() || null,
        tags:         Array.isArray(tags) ? tags.map(t => t.trim()).filter(Boolean) : [],
        apply_url:    apply_url?.trim() || null,
        posted_by:    userId,
        is_active:    true,
      })
      .select()
      .single();

    if (error) throw error;

    return sendSuccess(res, 201, 'Job posted successfully!', job);
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/jobs/:id ──────────────────────────────────────────
// Soft delete: sets is_active = false
// Only the job poster can delete it
export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // First, verify ownership
    const { data: job, error: fetchError } = await supabaseAdmin
      .from('jobs')
      .select('id, posted_by')
      .eq('id', id)
      .single();

    if (fetchError || !job) {
      return sendError(res, 404, 'Job not found.');
    }

    if (job.posted_by !== userId) {
      return sendError(res, 403, 'Forbidden: You can only delete your own job posts.');
    }

    const { error: deleteError } = await supabaseAdmin
      .from('jobs')
      .update({ is_active: false })
      .eq('id', id);

    if (deleteError) throw deleteError;

    return sendSuccess(res, 200, 'Job removed successfully.');
  } catch (err) {
    next(err);
  }
};

// ── GET /api/jobs/mine ────────────────────────────────────────────
// Returns jobs posted by the authenticated user
export const getMyJobs = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { data: jobs, error } = await supabaseAdmin
      .from('jobs')
      .select('*')
      .eq('posted_by', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return sendSuccess(res, 200, 'Your jobs fetched successfully.', jobs || []);
  } catch (err) {
    next(err);
  }
};
