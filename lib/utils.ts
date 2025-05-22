import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  
  // Handle "Present" or other non-date strings
  if (dateString === "Present") return "Present";
  
  // Try to parse the date
  try {
    // Check if the date is in YYYY-MM format
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      const [year, month] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      
      // Format as "Month Year" (e.g., "January 2020")
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    
    // If it's a full date, parse it
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch (error) {
    // If parsing fails, return the original string
    return dateString;
  }
}