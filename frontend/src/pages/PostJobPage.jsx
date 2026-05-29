// frontend/src/pages/PostJobPage.jsx
import PostJobForm from '../components/forms/PostJobForm.jsx';
import { PlusCircle } from 'lucide-react';

const PostJobPage = () => (
  <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-up opacity-0"
        style={{ animationFillMode: 'forwards' }}>
    {/* Header */}
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 bg-tint-lavender rounded-full px-3 py-1 mb-4">
        <PlusCircle size={12} className="text-primary" />
        <span className="text-xs font-semibold text-brand-purple-800">New Listing</span>
      </div>
      <h1 className="font-semibold text-h2 text-ink mb-2">Post a Job</h1>
      <p className="text-slate text-sm">
        Fill in the details below to publish your job listing. It will go live immediately.
      </p>
    </div>

    {/* Form Card — DESIGN.MD: card-feature */}
    <div className="bg-canvas border border-hairline rounded-lg p-6 sm:p-8 shadow-card">
      <PostJobForm />
    </div>
  </main>
);

export default PostJobPage;
