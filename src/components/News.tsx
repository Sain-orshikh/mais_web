"use client"

import { useQuery } from '@tanstack/react-query';
import { useState } from "react"
import { API_BASE_URL } from '../config/api';
import { Grid, Pagination, Stack } from "@mui/material"
import BlogCard from "./ui/BlogCard";
import { AnimatedBackground } from "./ui/animatedbg";

export default function BlogsPage() {

  const {data:blogs, isLoading} = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/news/fetch`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
      // Filter to only show published news
      const publishedNews = (data.data || []).filter((n: any) => n.status === 'published');
      return { data: publishedNews };
    },
    retry: 1,
  });
  
  const Blogs = blogs?.data;

  console.log("Blogs data:", Blogs);
  const [visibleBlogs, setVisibleBlogs] = useState(12);

  const handleLoadMore = () => {
    setVisibleBlogs((prevNum: number) => prevNum + 12);
  };

  let displayedBlogs = [];


  if(Blogs){
    displayedBlogs = [...Blogs].slice(0, visibleBlogs);
  }
  
  const categories = [
    "All",
    "Study Tips",
    "Productivity",
    "Study Skills",
    "Mental Health",
    "Technology",
    "Others"
  ]

  return (
    <>
      <div className="flex flex-col min-h-screen container mx-auto px-4 py-8 max-w-4xl">
        <main className="space-y-8">
          <h1 className="text-4xl font-bold mb-6">
            All News
          </h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : Blogs && Blogs.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-300 pb-4">
                <AnimatedBackground
                  defaultValue='All'
                  className='rounded-lg bg-gray-300 dark:bg-zinc-700'
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.2,
                  }}
                >
                  {categories.map((label, index) => {
                    return (
                      <button
                        key={index}
                        data-id={label}
                        type='button'
                        aria-label={`${label} view`}
                        className='inline-flex px-4 py-2 rounded-full items-center bg-gray-100 justify-center text-center text-zinc-800 transition-transform active:scale-[0.98] dark:text-zinc-50'
                      >
                        {label}
                      </button>
                    );
                  })}
                </AnimatedBackground>
              </div>
              <Grid container columnSpacing={4} rowSpacing={2} columns={12} >
                {displayedBlogs.map((blog) => (
                <Grid 
                  size={{ xs: 12, sm: 4 }}
                  key={blog._id}
                  className="mx-auto"
                >
                  <BlogCard blog={blog} isPreview={false} />
                </Grid>
                ))}
              </Grid>
              {displayedBlogs.length < Blogs.length && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleLoadMore}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No published news articles available yet.</p>
            </div>
          )}
        </main>
        <div className='flex w-full mt-auto'>
          <Stack spacing={2} className='flex w-full' sx={{ width: '100%', alignItems: 'center' }}>
            <Pagination count={10} variant="outlined" shape="rounded" size='large'/>
          </Stack>
        </div>
      </div>
    </>
  )
}