import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Experience {
  id: string;
  name: string;
  comment: string;
  date: string;
}

const ExperiencesSection: React.FC = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      toast.error('Please fill in your name and comment');
      return;
    }

    setIsSubmitting(true);

    try {
      const newExperience: Experience = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        comment,
        date: new Date().toISOString()
      };

      setExperiences(prev => [newExperience, ...prev]);
      setName('');
      setComment('');
      toast.success('Thank you for sharing your experience!');
    } catch (error) {
      toast.error('Failed to submit your experience. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Share Your Experience</h2>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Textarea
                placeholder="Share your experience with us..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Share Experience'}
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  {experience.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold">{experience.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(experience.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-gray-700">{experience.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection; 