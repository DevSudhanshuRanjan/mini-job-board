// frontend/src/hooks/useJobs.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api.js';

// ── Fetch paginated / filtered jobs ──────────────────────────────
export const useJobs = ({ type, search, page = 1 } = {}) => {
  return useQuery({
    queryKey: ['jobs', { type, search, page }],
    queryFn:  async () => {
      const params = new URLSearchParams();
      if (type)   params.set('type',   type);
      if (search) params.set('search', search);
      if (page)   params.set('page',   String(page));

      const { data } = await api.get(`/jobs?${params.toString()}`);
      return data;
    },
    staleTime:  30 * 1000, // 30 seconds
    keepPreviousData: true, // smooth page transitions
  });
};

// ── Fetch single job by ID ────────────────────────────────────────
export const useJob = (id) => {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn:  async () => {
      const { data } = await api.get(`/jobs/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

// ── Fetch jobs posted by the current user ─────────────────────────
export const useMyJobs = () => {
  return useQuery({
    queryKey: ['jobs', 'mine'],
    queryFn:  async () => {
      const { data } = await api.get('/jobs/mine');
      return data.data;
    },
  });
};

// ── Create a new job ──────────────────────────────────────────────
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobData) => {
      const { data } = await api.post('/jobs', jobData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};

// ── Delete a job ──────────────────────────────────────────────────
export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId) => {
      await api.delete(`/jobs/${jobId}`);
      return jobId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};
