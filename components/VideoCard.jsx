import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "../context/favorites-context";


const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    $id,
    creator: { username, avatar },
  },
}) => {
  const favoriteVideosCtx = useContext(FavoritesContext);

  const [play, setPlay] = useState(false);

  const videoIsFavorite = favoriteVideosCtx.ids.includes($id);


   const changeFavoriteStatus = () => {
    //  console.log("Pressed!");

     if (videoIsFavorite) {
       favoriteVideosCtx.removeFavorite($id);
     } else {
       favoriteVideosCtx.addFavorite($id);
     }
   };

   

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs font-pregular text-gray-100"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <TouchableOpacity onPress={changeFavoriteStatus}>
            <Ionicons name="star-sharp" size={24} color={videoIsFavorite ? "#FFA001" : "white"} />
            {/* <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" /> */}
          </TouchableOpacity>
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute rounded-xl mt-3"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
