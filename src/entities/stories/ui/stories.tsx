"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { default as ReactStories } from "react-insta-stories"

import { cn, Container, Skeleton } from "@/shared"

import { StoryResponseDTO } from "../api/dto/response"
import { useStories } from "../model/use-stories"

interface Props {
  className?: string
}

export const Stories = ({ className }: Props) => {
  const [open, setOpen] = useState(false)
  const [selectedStory, setSelectedStory] = useState<StoryResponseDTO>()

  const { data: stories, isLoading } = useStories()

  const onClickStory = (story: StoryResponseDTO) => {
    setSelectedStory(story)

    if (story.items.length > 0) {
      setOpen(true)
    }
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [open])

  return (
    <Container
      className={cn(
        "flex items-center justify-between gap-2 my-10 pb-4 overflow-scroll",
        className
      )}
    >
      {stories?.length === 0 || isLoading
        ? [...Array(6)].map((_, index) => (
            <Skeleton key={index} className="w-[200px] h-[250px] rounded-md" />
          ))
        : null}

      {stories?.map((story) => (
        <img
          key={story.id}
          onClick={() => onClickStory(story)}
          className="rounded-md cursor-pointer"
          height={250}
          width={200}
          alt={story.id.toString()}
          src={story.previewImageUrl}
        />
      ))}

      {open && (
        <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-1000">
          <div className="relative" style={{ width: 520 }}>
            <button
              className="absolute -right-10 -top-5 z-30"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
            </button>

            <ReactStories
              onAllStoriesEnd={() => setOpen(false)}
              stories={
                selectedStory?.items.map((item) => ({
                  url: item.sourceUrl,
                })) || []
              }
              defaultInterval={3000}
              width={520}
              height={800}
            />
          </div>
        </div>
      )}
    </Container>
  )
}
