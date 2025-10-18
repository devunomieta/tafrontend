import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { chainOptions, nicheOptions } from "@/constants/options";
import FormCheckbox from "@/components/form/formCheckbox";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import FileInput from "@/components/ui/FileInput";
import InputFile from "@/components/ui/inputFile";
import InputList from "@/components/ui/InputList";
import { ProjectDetail } from "@/types/project.types";
import {
  editProject
} from "@/redux/slices/projectSlice";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa6";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useForm, Controller } from "react-hook-form";
import { ClipLoader } from "react-spinners";

interface EditProjectProps {
  projectDetail: ProjectDetail;
}

const EditProject = ({ projectDetail }: EditProjectProps) => {
  const dispatch = useAppDispatch();
  const { loading, steps, projectData, error } = useAppSelector(
    (state: RootState) => state.project
  );

  const chains = chainOptions.map(item => item.value)
  const projectChains = chains.some(chain => projectDetail.categories.includes(chain))

  const niches = nicheOptions.map(item => item.value)
  const projectNiche = niches.some(niche => projectDetail.categories.includes(niche))

  const editProjectData = {
    name: projectDetail.name || "",
    description: projectDetail.description || "",
    social: projectDetail.social || "",
    whitepaper: projectDetail.whitepaper || "",
    isTeam: "No",
    team_emails: projectDetail.team_emails || [],
    avatar: projectDetail.avatar || "",
    chains: projectChains,
    niche: projectNiche,
  };
  console.log(editProjectData);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "all",
    defaultValues: editProjectData,
  });

  const isTeamValue = watch("isTeam");

  const finalData = (formData: any) => {
    return {
      name: formData.name,
      description: formData.description,
      avatar: formData.avatar,
      social: formData.social,
      whitepaper: formData.whitepaper,
      categories: [...(formData.chains || []), ...(formData.niche || [])],
      team_emails: formData.team_emails,
    };
  };

  const onSubmit = async (data: any) => {
    try {
      console.log(finalData(data));
      await dispatch(
        editProject({
          project_uuid: projectDetail.uuid,
          editProjectData: finalData(data),
        })
      ).unwrap();

      toast.success("Project updated successfully!", { theme: "dark" });
    } catch (error: any) {
      console.log(error);
      toast(<div>{error}</div>, {
        theme: "dark",
        type: "error",
      });
    }
  };

  return (
    <div className="w-1/2">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full font-sans bg-black hover:bg-white hover:text-black text-white rounded-full py-3 mb-4 max-sm:text-[13px] max-sm:font-semibold">
            Edit Project
          </Button>
        </DialogTrigger>
        <DialogContent
          className=" font-sans bg-[#161616] border-[#303030] rounded-2xl py-8 px-7 sm:max-w-[425px] lg:!max-w-[480px] !max-h-[90vh] max-sm:!max-h-[95vh] overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <DialogHeader>
            <DialogTitle className="font-medium text-2xl">
              Edit Project
            </DialogTitle>
            <DialogDescription className="text-xs text-[#dddddd] font-light">
              Enter the details of the project in the form below
            </DialogDescription>
          </DialogHeader>
          <form
            className="font-sans text-[#F4F4F4F4] w-full mt-8 flex flex-col gap-y-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="name" className="font-medium text-sm">
                Project name
              </Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="name"
                    className="border-[#434343] rounded-[8px] py-[19px] px-4"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message || "Please enter your Project Name"}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="description" className="font-medium text-sm">
                Project Description
              </Label>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Textarea
                    id="description"
                    className="border-[#434343] rounded-[8px] py-[19px] px-4"
                    {...field}
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors?.description.message ||
                    "Please enter your project description"}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="social" className="font-medium text-sm">
                Social url (X)
              </Label>
              <Controller
                name="social"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="social"
                    className="border-[#434343] rounded-[8px] py-[19px] px-4"
                    {...field}
                  />
                )}
              />
              {errors.social && (
                <p className="text-red-500 text-sm">
                  {errors.social.message ||
                    "Please enter your X(Twitter) handle"}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="whitepaper" className="font-medium text-sm">
                Project Whitepaper
              </Label>
              <Controller
                name="whitepaper"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <InputFile onChange={field.onChange} />}
              />
              {errors.whitepaper && (
                <p className="text-red-500 text-sm">
                  {errors.whitepaper.message ||
                    "Please input a valid url or file upload"}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="isTeam" className="font-medium text-sm">
                Does this project have a team?
              </Label>
              <Controller
                name="isTeam"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full border-[#434343] rounded-[8px] py-[19px] px-4">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#161616]">
                      <SelectGroup>
                        <SelectLabel>Select option</SelectLabel>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.isTeam && (
                <p className="text-red-500 text-sm">
                  {errors.isTeam.message ||
                    "Please select if you have a team or not"}
                </p>
              )}
            </div>

            {isTeamValue === "Yes" && (
              <div className="flex flex-col gap-y-2 w-full">
                <Label htmlFor="isTeam" className="font-medium text-sm">
                  Team email (Max 5)
                </Label>
                <Controller
                  name="team_emails"
                  control={control}
                  rules={{
                    required:
                      isTeamValue === "Yes"
                        ? "Please enter your team emails"
                        : false,
                  }}
                  render={({ field }) => (
                    <InputList
                      value={field.value}
                      onChange={field.onChange}
                      className=""
                      maxItems={5}
                    />
                  )}
                />
                {errors.team_emails && (
                  <p className="text-red-500 text-sm">
                    {errors.team_emails.message ||
                      "Please enter your team emails"}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="avatar" className="font-medium text-sm">
                Project Logo
              </Label>
              <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                  <FileInput value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.avatar && (
                <p className="text-red-500 text-sm">
                  {errors.avatar.message ||
                    "Please input a valid url or file upload"}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="username" className="font-medium text-sm">
                Chains (Max. 3)
              </Label>
              <Controller
                name="chains"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormCheckbox
                    options={chainOptions}
                    values={Array.isArray(field.value) ? field.value : []}
                    onChange={field.onChange}
                    selectedIcon={<FaCheck />}
                    maxSelected={3}
                  />
                )}
              />
              {errors.chains && (
                <p className="text-red-500 text-sm">
                  {errors.chains.message || "Please select your chains"}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 w-full">
              <Label htmlFor="skills" className="font-medium text-sm">
                Niche (Max. 3)
              </Label>
              <Controller
                name="niche"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormCheckbox
                    options={nicheOptions}
                    values={Array.isArray(field.value) ? field.value : []}
                    onChange={field.onChange}
                    selectedIcon={<FaCheck />}
                    maxSelected={3}
                  />
                )}
              />
              {errors.niche && (
                <p className="text-red-500 text-sm">
                  {errors.niche.message || "Please select your niche"}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-[#430B68] hover:bg-[#430B68] rounded-full font-semibold"
            >
              {loading ? (
                <ClipLoader color="#F4F4F4F4" size={20} />
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProject;
