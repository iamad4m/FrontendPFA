"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

async function keycloakSessionLogOut() {
  try {
    const timestamp = new Date().getTime();
    await fetch(`/api/auth/logout?timestamp=${timestamp}`, {
      method: "GET",
      cache: "no-store",
    });
  } catch (err) {
    console.error(err);
  }
}

export default function page() {
  const { data: session } = useSession();

  const [settingsTab, setSettingsTab] = useState(true);
  const [emailTab, setEmailTab] = useState(false);
  const [passwordTab, setPasswordTab] = useState(false);

  const [firstNameInfo, setFirstNameInfo] = useState("");
  const [lastNameInfo, setLastNameInfo] = useState("");
  const [phoneNumberInfo, setPhoneNumberInfo] = useState("");

  const [updateEmailNew, setUpdateEmailNew] = useState("");
  const [updateEmailConfirm, setUpdateEmailConfirm] = useState("");
  const [updateEmailPassword, setUpdateEmailPassword] = useState("");

  const [updatePassword, setUpdatePassword] = useState("");

  const [deletePassword, setDeletePassword] = useState("");

  const schemaInfo = yup.object().shape({
    firstName: yup.string().trim().required(),
    lastName: yup.string().trim().required(),
    phoneNumber: yup
      .string()
      .matches(/^\+\d{1,3} \d{9}$$/)
      .required(),
  });

  const schemaUpdateEmail = yup.object().shape({
    newEmail: yup.string().trim().email().required(),
    newEmailConfirm: yup
      .string()
      .trim()
      .email()
      .oneOf([yup.ref("newEmail")])
      .required(),
    newEmailPassword: yup.string().required(),
  });

  const schemaUpdatePassword = yup.object().shape({
    updatePasswordConfirm: yup.string().required(),
  });

  const schemaDelete = yup.object().shape({
    deleteConfirm: yup.string().required(),
  });

  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    formState: { errors: errorsInfo },
  } = useForm({
    resolver: yupResolver(schemaInfo),
  });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm({
    resolver: yupResolver(schemaUpdateEmail),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    resolver: yupResolver(schemaUpdatePassword),
  });

  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    formState: { errors: errorsDelete },
  } = useForm({
    resolver: yupResolver(schemaDelete),
  });

  const {
    data: touristInfo,
    refetch: refetchInfo,
    isLoading,
  } = useQuery({
    queryKey: ["getTouristInfo", session.user.email],
    queryFn: () =>
      axios.get(`/api/touristInfo?email=${session.user.email}`).then((res) => {
        setFirstNameInfo(res.data.firstName);
        setLastNameInfo(res.data.lastName);
        setPhoneNumberInfo(res.data.phoneNumber);
        return res.data;
      }),
    cacheTime: 0,
  });

  const mutationInfo = useMutation({
    mutationFn: (dataInfo) => {
      return axios.post(
        `/api/touristInfo?email=${session.user.email}`,
        dataInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    onMutate: (variables) => {
      console.log("posting...");
      const loader = document.getElementById("loader");
      const container = document.getElementById("mainContainer");
      loader.classList.remove("hidden");
      container.classList.add("overflow-y-hidden");
    },
    onSuccess: (data, variables, context) => {
      console.log("tourist updated");
      const loader = document.getElementById("loader");
      const container = document.getElementById("mainContainer");
      refetchInfo();
      loader.classList.add("hidden");
      container.classList.remove("overflow-y-hidden");
    },
    onError: (err, variables, context) => {
      console.log(err.message);
      const loader = document.getElementById("loader");
      const container = document.getElementById("mainContainer");
      loader.classList.add("hidden");
      container.classList.remove("overflow-y-hidden");
    },
  });

  const mutationEmail = useMutation({
    mutationFn: (dataEmail) => {
      return axios.post(
        `/api/updateEmail?email=${session.user.email}`,
        dataEmail,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    onMutate: (variables) => {
      console.log("posting...");
      const loader = document.getElementById("loader");
      const container = document.getElementById("mainContainer");
      loader.classList.remove("hidden");
      container.classList.add("overflow-y-hidden");
    },
    onSuccess: (data, variables, context) => {
      console.log("tourist email updated");
      keycloakSessionLogOut()
        .then(() => signIn("keycloak"))
        .then(() => signOut());
      const loader = document.getElementById("loader");
      const container = document.getElementById("mainContainer");
      loader.classList.add("hidden");
      container.classList.remove("overflow-y-hidden");
    },
    onError: (err, variables, context) => {
      console.log(err.message);
      const loader = document.getElementById("loader");
      const container = document.getElementById("mainContainer");
      loader.classList.add("hidden");
      container.classList.remove("overflow-y-hidden");
    },
  });

  const mutationPassword = useMutation({
    mutationFn: (dataPassword) => {
      return axios.post(
        `/api/updatePassword?email=${session.user.email}`,
        dataPassword,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    onMutate: (variables) => {
      console.log("posting...");
      const loader = document.getElementById("loader");
      const container = document.getElementById("mainContainer");
      loader.classList.remove("hidden");
      container.classList.add("overflow-y-hidden");
    },
    onSuccess: (data, variables, context) => {
      console.log("tourist password updated");
      keycloakSessionLogOut()
        .then(() => signIn("keycloak"))
        .then(() => signOut());
      const loader = document.getElementById("loader");
      const container = document.getElementById("mainContainer");
      loader.classList.add("hidden");
      container.classList.remove("overflow-y-hidden");
    },
    onError: (err, variables, context) => {
      console.log(err.message);
      const loader = document.getElementById("loader");
      const container = document.getElementById("mainContainer");
      loader.classList.add("hidden");
      container.classList.remove("overflow-y-hidden");
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (dataDelete) => {
      return axios.post(
        `/api/deleteTourist?email=${session.user.email}`,
        dataDelete,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    onMutate: (variables) => {
      console.log("posting...");
      const loader = document.getElementById("loader");
      const container = document.getElementById("mainContainer");
      loader.classList.remove("hidden");
      container.classList.add("overflow-y-hidden");
    },
    onSuccess: (data, variables, context) => {
      console.log("tourist disabled");
      keycloakSessionLogOut().then(() => signOut());
      const loader = document.getElementById("loader");
      const container = document.getElementById("mainContainer");
      loader.classList.add("hidden");
      container.classList.remove("overflow-y-hidden");
    },
    onError: (err, variables, context) => {
      console.log(err.message);
      const loader = document.getElementById("loader");
      const container = document.getElementById("mainContainer");
      loader.classList.add("hidden");
      container.classList.remove("overflow-y-hidden");
    },
  });

  const mySubmitInfo = (data) => {
    mutationInfo.mutate(data);
  };

  const mySubmitEmail = (data) => {
    mutationEmail.mutate(data);
  };

  const mySubmitPassword = (data) => {
    mutationPassword.mutate(data);
  };

  const mySubmitDelete = (data) => {
    mutationDelete.mutate(data);
  };

  return (
    <>
      {isLoading ? (
        <div
          className="absolute bg-white bg-opacity-100 z-10 h-full w-full flex items-center justify-center"
          id="loader"
        >
          <div className="flex items-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full overflow-x-hidden" id="mainContainer">
          <div
            className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center hidden"
            id="loader"
          >
            <div className="flex items-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
              </div>
            </div>
          </div>
          <header className="top-0 bg-white shadow p-4 h-16 flex flex-col items-start justify-center">
            <ol
              className="flex items-center whitespace-nowrap"
              aria-label="Breadcrumb"
            >
              <li className="inline-flex items-center">
                <Link
                  className="flex items-center text-sm hover:text-blue-600 outline-none text-blue-600"
                  href="/tourist"
                >
                  Profile
                </Link>
                <svg
                  className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </li>

              <li
                className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-gray-200"
                aria-current="page"
              >
                Settings
              </li>
            </ol>
          </header>
          <main className="flex flex-wrap -mb-4 -mx-2 p-4">
            <div className="w-full sm:w-1/4 md:w-1/4 mb-4 px-2">
              <div className="bg-white shadow-xl border border-gray-200 rounded-lg py-3">
                <div className="photo-wrapper p-2">
                  <img
                    className="w-32 h-32 rounded-full mx-auto bg-gray-200 border-2 border-indigo-600"
                    src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${touristInfo?.email}&radius=50&size=50&backgroundType=gradientLinear`}
                    alt={`${touristInfo?.firstName} ${touristInfo?.lastName}`}
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    {touristInfo?.firstName} {touristInfo?.lastName}
                  </h3>
                  <div className="text-center text-gray-400 text-xs font-semibold">
                    <p>Tourist</p>
                  </div>
                  <table className="text-xs my-3 flex items-center justify-center">
                    <tbody>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">
                          Email
                        </td>
                        <td className="px-2 py-2">{touristInfo?.email}</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 text-gray-500 font-semibold">
                          Phone
                        </td>
                        <td className="px-2 py-2">
                          {touristInfo?.phoneNumber}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-3/4 md:w-3/4 mb-4 px-2">
              <div className="flex flex-wrap -mb-4 -mx-2">
                <div className="w-full mb-4 px-2">
                  <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
                    <div className="sm:hidden">
                      <label htmlFor="tabs" className="sr-only">
                        Select tab
                      </label>
                      <select
                        id="tabs"
                        className="bg-white border-0 border-b border-gray-200 text-gray-700 text-sm rounded-t-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        onChange={(event) => {
                          if (event.target.value == "settings") {
                            setSettingsTab(true);
                            setEmailTab(false);
                            setPasswordTab(false);
                          } else if (event.target.value == "email") {
                            setSettingsTab(false);
                            setEmailTab(true);
                            setPasswordTab(false);
                          } else if (event.target.value == "password") {
                            setSettingsTab(false);
                            setEmailTab(false);
                            setPasswordTab(true);
                          }
                        }}
                      >
                        <option value="settings" selected={settingsTab}>
                          General Settings
                        </option>
                        <option value="email" selected={emailTab}>
                          Update Email
                        </option>
                        <option value="password" selected={passwordTab}>
                          Update Password
                        </option>
                      </select>
                    </div>
                    <ul
                      className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
                      id="fullWidthTab"
                      data-tabs-toggle="#fullWidthTabContent"
                      role="tablist"
                    >
                      <li className="w-full ">
                        <button
                          id="settings-tab"
                          data-tabs-target="#settings"
                          type="button"
                          role="tab"
                          aria-controls="settings"
                          aria-selected="true"
                          className={
                            settingsTab
                              ? "inline-block w-full p-4 text-blue-600 bg-white hover:bg-indigo-50 focus:outline-none rounded-tl-lg"
                              : "inline-block w-full p-4 text-gray-700 bg-white hover:bg-indigo-50 focus:outline-none rounded-tl-lg"
                          }
                          onClick={() => {
                            setSettingsTab(true);
                            setEmailTab(false);
                            setPasswordTab(false);
                          }}
                        >
                          General Settings
                        </button>
                      </li>
                      <li className="w-full">
                        <button
                          id="email-tab"
                          data-tabs-target="#email"
                          type="button"
                          role="tab"
                          aria-controls="email"
                          aria-selected="false"
                          className={
                            emailTab
                              ? "inline-block w-full p-4 text-blue-600 bg-white hover:bg-indigo-50 focus:outline-none"
                              : "inline-block w-full p-4 text-gray-700 bg-white hover:bg-indigo-50 focus:outline-none"
                          }
                          onClick={() => {
                            setSettingsTab(false);
                            setEmailTab(true);
                            setPasswordTab(false);
                          }}
                        >
                          Update Email
                        </button>
                      </li>
                      <li className="w-full">
                        <button
                          id="password-tab"
                          data-tabs-target="#password"
                          type="button"
                          role="tab"
                          aria-controls="password"
                          aria-selected="false"
                          className={
                            passwordTab
                              ? "inline-block w-full p-4 text-blue-600 bg-white hover:bg-indigo-50 focus:outline-none rounded-tr-lg"
                              : "inline-block w-full p-4 text-gray-700 bg-white hover:bg-indigo-50 focus:outline-none rounded-tr-lg"
                          }
                          onClick={() => {
                            setSettingsTab(false);
                            setEmailTab(false);
                            setPasswordTab(true);
                          }}
                        >
                          Update Password
                        </button>
                      </li>
                    </ul>
                    <div
                      id="fullWidthTabContent"
                      className="border-t border-gray-200 dark:border-gray-600"
                    >
                      <div
                        className={
                          settingsTab
                            ? "p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                            : "hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                        }
                        id="settings"
                        role="tabpanel"
                        aria-labelledby="settings-tab"
                      >
                        <form
                          className="flex flex-col items-start justify-center"
                          onSubmit={handleSubmitInfo(mySubmitInfo)}
                        >
                          <div className="mb-5 w-2/3">
                            <label
                              htmlFor="firstName"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              className={
                                errorsInfo.firstName
                                  ? "bg-white border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5"
                                  : "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                              }
                              placeholder="First Name"
                              value={firstNameInfo}
                              {...registerInfo("firstName")}
                              onChange={(e) => setFirstNameInfo(e.target.value)}
                            />
                          </div>
                          <div className="mb-5 w-2/3">
                            <label
                              htmlFor="lastName"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              className={
                                errorsInfo.lastName
                                  ? "bg-white border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5"
                                  : "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                              }
                              placeholder="Last Name"
                              value={lastNameInfo}
                              {...registerInfo("lastName")}
                              onChange={(e) => setLastNameInfo(e.target.value)}
                            />
                          </div>
                          <div className="mb-5 w-2/3">
                            <label
                              htmlFor="phone"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Phone
                            </label>
                            <input
                              type="text"
                              id="phone"
                              className={
                                errorsInfo.phoneNumber
                                  ? "bg-white border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5"
                                  : "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                              }
                              value={phoneNumberInfo}
                              {...registerInfo("phoneNumber")}
                              onChange={(e) =>
                                setPhoneNumberInfo(e.target.value)
                              }
                            />
                          </div>
                          <button
                            type="submit"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 -mb-2"
                          >
                            Save
                          </button>
                        </form>
                      </div>
                      <div
                        className={
                          emailTab
                            ? "p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                            : "hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                        }
                        id="email"
                        role="tabpanel"
                        aria-labelledby="email-tab"
                      >
                        <form
                          className="flex flex-col items-start justify-center"
                          onSubmit={handleSubmitEmail(mySubmitEmail)}
                        >
                          <div className="mb-5 w-2/3">
                            <label
                              htmlFor="newemail"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              New Email
                            </label>
                            <input
                              type="text"
                              id="newemail"
                              className={
                                errorsEmail.newEmail
                                  ? "bg-white border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5"
                                  : "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                              }
                              placeholder="Enter your new email"
                              {...registerEmail("newEmail")}
                            />
                          </div>
                          <div className="mb-5 w-2/3">
                            <label
                              htmlFor="confirmnewemail"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Confirm New Email
                            </label>
                            <input
                              type="text"
                              id="confirmnewemail"
                              className={
                                errorsEmail.newEmailConfirm
                                  ? "bg-white border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5"
                                  : "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                              }
                              placeholder="Confirm your new email"
                              {...registerEmail("newEmailConfirm")}
                            />
                          </div>
                          <div className="mb-5 w-2/3">
                            <label
                              htmlFor="newemailpassword"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="newemailpassword"
                              className={
                                errorsEmail.newEmailPassword
                                  ? "bg-white border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5"
                                  : "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                              }
                              placeholder="Enter your current password to confirm the update"
                              {...registerEmail("newEmailPassword")}
                            />
                          </div>

                          <button
                            type="submit"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 -mb-2"
                          >
                            Save
                          </button>
                        </form>
                      </div>
                      <div
                        className={
                          passwordTab
                            ? "p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                            : "hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
                        }
                        id="password"
                        role="tabpanel"
                        aria-labelledby="password-tab"
                      >
                        <form
                          className="w-full h-full flex flex-col items-start justify-center"
                          onSubmit={handleSubmitPassword(mySubmitPassword)}
                        >
                          <p className="mb-2 text-lg font-semibold text-yellow-600">
                            How it works:
                          </p>
                          <p className="mb-5 text-base font-normal text-gray-600">
                            To confirm this update, you must enter your current
                            password. After that, you will be logged out of the
                            application and redirected to the login page, enter
                            your credentials, and then you will be asked to
                            enter and confirm your new password.
                          </p>
                          <div className="mb-5 w-2/3">
                            <input
                              type="password"
                              id="currentpass"
                              className={
                                errorsPassword.updatePasswordConfirm
                                  ? "bg-white border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5"
                                  : "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                              }
                              placeholder="Enter your current password to confirm the update"
                              {...registerPassword("updatePasswordConfirm")}
                            />
                          </div>
                          <button
                            type="submit"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 -mb-2"
                          >
                            Save
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full mb-4 px-2">
                  <div className="w-full bg-white border border-pink-200 rounded-lg shadow">
                    <form
                      className="p-4 md:p-8"
                      onSubmit={handleSubmitDelete(mySubmitDelete)}
                    >
                      <h3 className="text-lg font-semibold text-pink-600 mb-2">
                        Delete Account
                      </h3>
                      <p className="mb-5 text-base font-normal text-gray-600 dark:text-gray-400">
                        This action CAN be undone. This will delete the current
                        user circuits, posts, and remove all associated data. If
                        you want to recover your account, you must contact our
                        support.
                      </p>
                      <div className="mb-5 w-2/3">
                        <input
                          type="password"
                          className={
                            errorsDelete.deleteConfirm
                              ? "bg-white border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-600 focus:border-pink-600 block w-full p-2.5"
                              : "bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5"
                          }
                          placeholder="Enter your password to confirm account deletion"
                          {...registerDelete("deleteConfirm")}
                        />
                      </div>
                      <button
                        type="submit"
                        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 -mb-2"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
