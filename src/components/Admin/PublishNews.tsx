import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import NewsEditor from './NewsEditor'

const PublishNews = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='w-full h-full flex flex-col'>
        {/* Header with Back Button */}
        <div className='bg-white border-b px-6 py-4'>
          <button
            onClick={() => navigate('/admin/news')}
            className='flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors'
          >
            <ArrowLeft size={20} />
            <span className='font-medium'>Back to News Management</span>
          </button>
        </div>
        
        {/* Editor Content */}
        <div className='w-full flex-1 bg-white overflow-auto'>
          <NewsEditor />
        </div>
      </div>
    </>
  )
}

export default PublishNews
