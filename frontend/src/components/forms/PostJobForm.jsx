// frontend/src/components/forms/PostJobForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateJob } from '../../hooks/useJobs.js';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { validateJobForm, isFormValid } from '../../utils/validators.js';
import toast from 'react-hot-toast';
import { Briefcase, Building2, MapPin, Tag, DollarSign, Link, AlignLeft, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

const JOB_TYPES = ['Remote', 'On-site', 'Hybrid'];

const PostJobForm = () => {
  const navigate = useNavigate();
  const createJob = useCreateJob();

  const [form, setForm] = useState({
    title: '', company: '', location: '', type: '',
    description: '', salary_range: '', tags: '', apply_url: '',
  });
  const [errors,   setErrors]   = useState({});
  const [touched,  setTouched]  = useState({});

  const set = (field) => (e) => {
    const val = e.target ? e.target.value : e;
    setForm((f) => ({ ...f, [field]: val }));
    if (touched[field]) {
      const newErrors = validateJobForm({ ...form, [field]: val });
      setErrors(newErrors);
    }
  };

  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    const newErrors = validateJobForm(form);
    setErrors(newErrors);
  };

  const handleSubmit = async () => {
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    const validationErrors = validateJobForm(form);
    setErrors(validationErrors);

    if (!isFormValid(validationErrors)) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    try {
      const tagsArray = form.tags
        ? form.tags.split(',').map(t => t.trim()).filter(Boolean)
        : [];

      const newJob = await createJob.mutateAsync({
        ...form,
        tags: tagsArray,
      });

      toast.success('🎉 Job posted successfully!');
      navigate(`/jobs/${newJob.id}`);
    } catch (err) {
      toast.error(err.message || 'Failed to post job. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Title + Company row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Job Title"
          required
          placeholder="e.g. Senior Frontend Engineer"
          value={form.title}
          onChange={set('title')}
          onBlur={blur('title')}
          error={touched.title ? errors.title : undefined}
          leftIcon={<Briefcase size={15} />}
        />
        <Input
          label="Company"
          required
          placeholder="e.g. Stripe"
          value={form.company}
          onChange={set('company')}
          onBlur={blur('company')}
          error={touched.company ? errors.company : undefined}
          leftIcon={<Building2 size={15} />}
        />
      </div>

      {/* Location + Type row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Location"
          required
          placeholder="e.g. San Francisco, CA or Remote"
          value={form.location}
          onChange={set('location')}
          onBlur={blur('location')}
          error={touched.location ? errors.location : undefined}
          leftIcon={<MapPin size={15} />}
        />

        {/* Job Type Select — DESIGN.MD: text-input styling */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-charcoal">
            Job Type <span className="text-error ml-1">*</span>
          </label>
          <div className="relative">
            <select
              value={form.type}
              onChange={set('type')}
              onBlur={blur('type')}
              className={clsx(
                'w-full h-[44px] pl-4 pr-10 bg-canvas border rounded-md appearance-none',
                'text-base text-ink transition-all duration-150 cursor-pointer',
                'focus:outline-none focus:border-primary focus:border-2',
                !form.type && 'text-muted',
                touched.type && errors.type
                  ? 'border-error'
                  : 'border-hairline-strong hover:border-stone'
              )}
            >
              <option value="" disabled>Select type…</option>
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone pointer-events-none" />
          </div>
          {touched.type && errors.type && (
            <p className="text-xs text-error">⚠ {errors.type}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-charcoal flex items-center gap-1.5">
          <AlignLeft size={13} /> Description <span className="text-error ml-1">*</span>
        </label>
        <textarea
          value={form.description}
          onChange={set('description')}
          onBlur={blur('description')}
          placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity great…"
          rows={6}
          className={clsx(
            'w-full bg-canvas border rounded-md px-4 py-3 text-base',
            'text-ink placeholder:text-muted leading-[1.55] resize-y',
            'transition-all duration-150',
            'focus:outline-none focus:border-primary focus:border-2',
            touched.description && errors.description
              ? 'border-error'
              : 'border-hairline-strong hover:border-stone'
          )}
        />
        <div className="flex justify-between">
          {touched.description && errors.description ? (
            <p className="text-xs text-error">⚠ {errors.description}</p>
          ) : <span />}
          <p className="text-xs text-stone font-mono ml-auto">
            {form.description.length} / 5000
          </p>
        </div>
      </div>

      {/* Salary + Apply URL row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Salary Range"
          placeholder="e.g. $120,000 – $160,000"
          value={form.salary_range}
          onChange={set('salary_range')}
          hint="Optional. Helps attract more candidates."
          leftIcon={<DollarSign size={15} />}
        />
        <Input
          label="Apply URL"
          placeholder="https://company.com/careers/role"
          value={form.apply_url}
          onChange={set('apply_url')}
          onBlur={blur('apply_url')}
          error={touched.apply_url ? errors.apply_url : undefined}
          hint="Optional. Where candidates should apply."
          leftIcon={<Link size={15} />}
        />
      </div>

      {/* Tags */}
      <Input
        label="Tags / Skills"
        placeholder="React, TypeScript, Node.js  (comma-separated)"
        value={form.tags}
        onChange={set('tags')}
        hint="Up to 10 tags, separated by commas."
        leftIcon={<Tag size={15} />}
      />

      {/* Submit — DESIGN.MD: button-primary purple */}
      <Button
        onClick={handleSubmit}
        loading={createJob.isPending}
        variant="primary"
        size="lg"
        className="w-full mt-2"
      >
        {createJob.isPending ? 'Posting…' : 'Post Job'}
      </Button>

    </div>
  );
};

export default PostJobForm;
