import { getPageBySlug } from '@/lib/cosmic-helpers'
import PageHero from '@/components/PageHero'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
  const page = await getPageBySlug('about')
  
  if (!page) {
    return {
      title: 'About - StayScape',
      description: 'Learn more about StayScape'
    }
  }

  return {
    title: `${page.metadata.page_title} - StayScape`,
    description: page.metadata.seo_description || page.metadata.page_title
  }
}

export default async function AboutPage() {
  const page = await getPageBySlug('about')

  if (!page) {
    notFound()
  }

  const heroImage = page.metadata.hero_image?.imgix_url 
    ? `${page.metadata.hero_image.imgix_url}?w=2000&auto=format,compress`
    : undefined

  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title={page.metadata.page_title}
        description={page.metadata.seo_description || 'Discover what makes StayScape your trusted vacation rental platform'}
        backgroundImage={heroImage}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <div 
            className="markdown-content"
            dangerouslySetInnerHTML={{ 
              __html: page.metadata.content
                .replace(/^# /gm, '<h1 class="text-4xl font-bold text-gray-600 mb-6 mt-8">')
                .replace(/<\/h1>/g, '</h1>')
                .replace(/^## /gm, '<h2 class="text-3xl font-bold text-gray-600 mb-4 mt-8">')
                .replace(/<\/h2>/g, '</h2>')
                .replace(/^### /gm, '<h3 class="text-2xl font-semibold text-gray-600 mb-3 mt-6">')
                .replace(/<\/h3>/g, '</h3>')
                .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-600">$1</strong>')
                .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
                .replace(/\n\n/g, '</p><p class="text-gray-400 leading-relaxed mb-4">')
                .replace(/^(?!<[h|p])/gm, '<p class="text-gray-400 leading-relaxed mb-4">')
                .replace(/(?<!>)$/gm, '</p>')
            }}
          />
        </div>
      </div>
    </div>
  )
}