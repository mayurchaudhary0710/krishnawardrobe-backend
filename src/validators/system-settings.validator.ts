import { z } from 'zod';

const updateSystemSettingSchema = z.object({
  largeLogo: z.string().optional(),
  smallLogo: z.string().optional(),
  faviconIcon: z.string().optional(),
  homePageCarouselImages: z.array(z.string()).optional(),
  footerText: z.string().optional(),
});

type UpdateSystemSettingDto = z.infer<typeof updateSystemSettingSchema>;
export { updateSystemSettingSchema, UpdateSystemSettingDto };
