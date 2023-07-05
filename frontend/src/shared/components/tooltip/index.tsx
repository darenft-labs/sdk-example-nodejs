import React, { ReactNode } from "react"
import { Tooltip as TooltipAntd, TooltipProps } from "antd"
import "./index.css"

interface Props {
  color?: string
  title: string | ReactNode
  className?: string
  children?: React.ReactNode
  type?: string
}

export const Tooltip: React.FC<Props & TooltipProps> = ({ type, children, ...props }) => {
  const getInfor = (type: string) => {
    if (type === "string") {
      return `String of characters(text, number,etc), Ex: Dusk, Dawn 123, etc.`
    }
    if (type === "number") {
      return `Include integer and real number, Ex: 10, 16.8, etc.`
    }
    if (type === "integer") {
      return `Ex: 1, 2, 10, 99, etc.`
    }
    if (type === "boolean") {
      return `True or False value`
    }
    return ``
  }

  return (
    <TooltipAntd {...props} color={props.color ?? "white"} title={getInfor(type)}>
      {children}
    </TooltipAntd>
  )
}
