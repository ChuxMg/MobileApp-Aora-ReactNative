import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useContext } from "react";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import { FavoritesContext } from "../../context/favorites-context";
import EmptyState from "../../components/EmptyState";

const Bookmark = () => {
  const { data: posts } = useAppwrite(getAllPosts);

  const favoriteVideosCtx = useContext(FavoritesContext);

  const favoriteVideos = posts.filter((video) =>
    favoriteVideosCtx.ids.includes(video.$id)
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={favoriteVideos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-2xl font-psemibold text-white">
                  Favorite Videos
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Favorite Videos Found"
            subtitle="Select your favorite videos and see them appear here."
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
