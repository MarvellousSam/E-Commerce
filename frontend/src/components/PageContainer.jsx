import {useState} from 'react'

function PageContainer() {
    const [page, setPage] = useState(1)

    const previousPage=async(e)=>{
        e.preventDefault()
        if(page===1){
          setPage(1)
        }else{
          setPage((prev)=>prev - 1)
        }
    
      }
    
      const nextPage=async(e)=>{
        e.preventDefault()
        setPage((prev)=>prev + 1)
    
      }
  return (
    <div className='pageContainerS'>
        <button className='pageBtn' onClick={previousPage}>Previous page</button> 
        <span className='pageTxt'>{page}</span> 
        <button className='pageBtn' onClick={nextPage}>Next page</button>
    </div>
  )
}

export default PageContainer