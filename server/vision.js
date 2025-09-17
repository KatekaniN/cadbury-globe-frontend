// Optional Google Vision helper. Returns 'joy' if not configured or on error.
import vision from '@google-cloud/vision'

export async function detectMood(buffer) {
  try {
    // Only attempt if GOOGLE_APPLICATION_CREDENTIALS is set
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) return 'joy'
    const client = new vision.ImageAnnotatorClient()
    const [result] = await client.faceDetection({ image: { content: buffer } })
    const face = result?.faceAnnotations?.[0]
    if (!face) return 'joy'
    const joy = face.joyLikelihood || 'VERY_LIKELY'
    // Map likelihood to simplified mood (extend as desired)
    const likelihoodOrder = ['VERY_UNLIKELY','UNLIKELY','POSSIBLE','LIKELY','VERY_LIKELY']
    const idx = likelihoodOrder.indexOf(joy)
    return idx >= 3 ? 'joy' : 'neutral'
  } catch {
    return 'joy'
  }
}
