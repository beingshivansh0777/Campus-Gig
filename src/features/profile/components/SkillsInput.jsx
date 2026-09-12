import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { skillsApi } from '../api';

function SkillsInput({ value = [], onChange }) {
  const [input, setInput] = useState('');
  const [resolving, setResolving] = useState(false);
  const [error, setError] = useState('');

  const addSkill = async (rawName) => {
    const name = rawName.trim();
    if (!name) return;

    if (value.find((s) => s.skill.toLowerCase() === name.toLowerCase())) {
      setInput('');
      return; // already added
    }

    setResolving(true);
    setError('');

    try {
      // 1. Try to find an existing skill with this exact name first
      const searchRes = await skillsApi.search(name);
      const exactMatch = searchRes.data.find(
        (s) => s.skill.toLowerCase() === name.toLowerCase()
      );

      if (exactMatch) {
        onChange([...value, exactMatch]);
      } else {
        // 2. Doesn't exist yet — create it
        const createRes = await skillsApi.create(name);
        const newSkill = { id: createRes.data.id ?? createRes.data, skill: name };
        onChange([...value, newSkill]);
      }
      setInput('');
    } catch (err) {
      setError('Could not add this skill. Try again.');
    } finally {
      setResolving(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(input);
    }
  };

  const removeSkill = (skillId) => {
    onChange(value.filter((s) => s.id !== skillId));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((skill) => (
          <span
            key={skill.id}
            className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-body font-medium px-2.5 py-1 rounded-full"
          >
            {skill.skill}
            <button type="button" onClick={() => removeSkill(skill.id)}>
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input.trim() && addSkill(input)}
          placeholder="Type a skill and press Enter (e.g. React)"
          className="w-full border border-border bg-surface rounded-lg px-3 py-2.5 pr-9 font-body text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
        />
        {resolving && (
          <Loader2
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted animate-spin"
          />
        )}
      </div>
      {error && <p className="text-error text-xs mt-1.5">{error}</p>}
      <p className="text-xs font-body text-muted mt-1.5">
        Press Enter or comma to add a skill
      </p>
    </div>
  );
}

export default SkillsInput;