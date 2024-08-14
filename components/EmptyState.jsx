import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomBotton from "./CustomBotton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle, type }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      {type === "home" ? <CustomBotton title="Create video" handlePress={() => router.push("/create")} containerStyles="w-full my-5"/> : null}
    </View>
  );
};

export default EmptyState;
