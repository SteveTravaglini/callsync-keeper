
import * as z from 'zod';

export const formSchema = z.object({
  meetingUrl: z.string().url({ message: "Please enter a valid meeting URL" }),
  meetingType: z.enum(['zoom', 'google-meet', 'microsoft-teams', 'webex', 'other']),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  recordImmediately: z.boolean().default(true),
  scheduleTime: z.string().optional(),
  calendarIntegration: z.boolean().default(false),
  autoJoin: z.boolean().default(false),
  // New CRM fields
  syncToCrm: z.boolean().default(false),
  crmType: z.enum(['salesforce', 'hubspot', 'none']).default('none'),
});
