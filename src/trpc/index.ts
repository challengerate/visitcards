import { authRouter } from './auth-router'
import { router } from './trpc'
import { digitalBusinessCardRouter } from './digital-business-card-router'
import { mediaRouter } from './media-router'
import { visitorResponsesRouter } from './visitor-responses-router';

export const appRouter = router({
  auth: authRouter,
  digitalBusinessCards: digitalBusinessCardRouter,
  media: mediaRouter,
  visitorResponses: visitorResponsesRouter,
})

export type AppRouter = typeof appRouter