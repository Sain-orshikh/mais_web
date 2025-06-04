import Editor from './Editor'
import Sidebar from './Sidebar'

const Edit = () => {
  return (
    <>
      <div className='w-full h-full flex flex-row'>
        <div className='w-[10%] h-full bg-gray-200'>
          <Sidebar />
        </div>
        <div className='w-[90%] h-full bg-white'>
          <Editor />
        </div>
      </div>
    </>
  )
}

export default Edit