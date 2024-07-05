import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StoryItem = ({ title, upvotes, url }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span>{upvotes} upvotes</span>
          <Button as="a" href={url} target="_blank" rel="noopener noreferrer">
            Read more
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryItem;