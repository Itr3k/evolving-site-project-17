import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export const useDraftRestore = (onRestore: (data: any) => void) => {
  useEffect(() => {
    const draft = localStorage.getItem('projectIntakeDraft');
    if (draft) {
      try {
        const { data, timestamp } = JSON.parse(draft);
        const age = Date.now() - timestamp;
        
        // Only restore if less than 7 days old
        if (age < 7 * 24 * 60 * 60 * 1000) {
          const ageInHours = Math.floor(age / (1000 * 60 * 60));
          const ageText = ageInHours < 1 
            ? 'a few minutes ago' 
            : ageInHours === 1 
              ? '1 hour ago' 
              : `${ageInHours} hours ago`;
          
          // Create a button in the description to restore
          const toastWithAction = toast({
            title: "Draft found",
            description: `You have a saved draft from ${ageText}. Click "Restore Draft" to continue.`,
            duration: 10000,
          });
          
          // Create a custom button element and append it
          setTimeout(() => {
            const toastElement = document.querySelector('[data-sonner-toast]:last-child');
            if (toastElement) {
              const button = document.createElement('button');
              button.textContent = 'Restore Draft';
              button.className = 'mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors';
              button.onclick = () => {
                onRestore(data);
                toastWithAction.dismiss();
              };
              toastElement.appendChild(button);
            }
          }, 100);
        } else {
          // Clear old draft
          localStorage.removeItem('projectIntakeDraft');
        }
      } catch (e) {
        console.error('Failed to restore draft:', e);
        localStorage.removeItem('projectIntakeDraft');
      }
    }
  }, [onRestore]);
};
