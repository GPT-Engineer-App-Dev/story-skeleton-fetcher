import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import StoryItem from "@/components/StoryItem";
import SkeletonLoader from "@/components/SkeletonLoader";
import SearchBar from "@/components/SearchBar";

const fetchTopStories = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const storyIds = await response.json();
  const stories = await Promise.all(
    storyIds.slice(0, 100).map(async (id) => {
      const storyResponse = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return storyResponse.json();
    })
  );
  return stories;
};

const Index = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["topStories"],
    queryFn: fetchTopStories,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredStories = data?.filter((story) =>
    story.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <SkeletonLoader />
      ) : error ? (
        <div>Error fetching stories</div>
      ) : (
        <div className="grid gap-4">
          {filteredStories.map((story) => (
            <StoryItem
              key={story.id}
              title={story.title}
              upvotes={story.score}
              url={story.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
