'use client'

import useUsers from "@/store/useUsers";
import { useAuth } from "../loginForm/hooks/authApi";
import { useEffect, useRef } from "react";
import useToken from "@/store/useToken";

export default function AuthInit() {
  const onAuth = useAuth()
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    onAuth()
  }, [])

  return null
}