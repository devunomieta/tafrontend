"use client";
import React, { use, useEffect } from "react";
import Link from "next/link";
import Card from "@/components/card";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { BsPatchCheckFill } from "react-icons/bs";
import { fetchHiringDetails } from "@/redux/slices/hiringSlice";
import { RootState } from "@/redux/store";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProjectDetail } from "@/redux/slices/projectSlice";
import { useTimeAgo } from "@/hooks/useTimeAgo";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const dispatch = useAppDispatch();
  const { hiringPostItem } = useAppSelector((state: RootState) => state.hiring);
  const { projectDetail } = useAppSelector((state: RootState) => state.project);
  const timeAgo = useTimeAgo(hiringPostItem?.created_at || "");
  useEffect(() => {
    const getPrivateProjects = async () => {
      try {
        await dispatch(
          getProjectDetail(hiringPostItem?.project_uuid || "")
        ).unwrap();
      } catch (err: any) {
        console.log(err);
      }
    };

    getPrivateProjects();
  }, []);
  useEffect(() => {
    const getHiringDetails = async () => {
      try {
        await dispatch(fetchHiringDetails({ hire_uuid: slug })).unwrap();
      } catch (err: any) {
        console.log(err);
      }
    };

    getHiringDetails();
  }, []);
  return (
    <Card className="!p-0 flex flex-col gap-y-5 !rounded-[16px] !border-0">
      <div className="border-b border-b-[#303030] flex flex-col pb-5">
        <div className="md:!px-[23px] md:!py-5 !p-3 flex justify-between items-start">
          <div className="flex items-start gap-x-2.5 font-sans">
            <Avatar className="h-10 w-10 rounded-full overflow-hidden">
              <AvatarImage
                src={projectDetail?.avatar}
                className="w-full h-full"
              />
              <AvatarFallback className="bg-[#B348F9] text-[#f4f4f4]">
                CN
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm md:text-base text-[#f4f4f4]">
                {hiringPostItem?.title}
              </p>
              <p className="flex gap-x-1 items-center">
                <span className="text-[#A6A6A6] text-xs font-light">
                  {projectDetail?.name}
                </span>
                <BsPatchCheckFill size={12} color="#B348F9" />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Button className="!w-fit !h-fit p-0">
              <FiBookmark size={36} />
            </Button>
            <p className="text-base font-light font-sans text-[#A6A6A6]">
              {timeAgo}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-between mb-4 mx-auto w-11/12">
          <div className="flex flex-wrap gap-2.5">
            <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
              {hiringPostItem?.type}
            </div>
            <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
              {hiringPostItem?.experience}
            </div>
            <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
              {hiringPostItem?.location}
            </div>
            <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
              {hiringPostItem?.pay_range}
            </div>
            <div className="flex gap-x-2.5 items-center px-3 py-[7px] border border-[#434343] text-[#f4f4f4] rounded-full text-[10px] font-normal font-sans">
              {hiringPostItem?.location}
            </div>
          </div>
        </div>
        <Link
          href={hiringPostItem?.link || ""}
          target="_blank"
          className="bg-[#430B68] hover:bg-[#430B68] rounded-full py-2 px-4 text-sm text-center font-sans font-medium !w-11/12 mx-auto"
        >
          View Details
        </Link>
      </div>
      <p
        className="md:!px-[23px] md:!py-5 !p-3 text-[#F4F4F4F4] text-base font-normal font-sans h-[55vh] overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {hiringPostItem?.description}
      </p>
    </Card>
  );
}
