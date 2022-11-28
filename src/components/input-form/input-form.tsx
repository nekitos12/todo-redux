import React from 'react'
import './input-form.scss'
import { UseFormRegister } from 'react-hook-form'

import { INewProjectForm } from '../../types/project'
import { INewTodoForm } from '../../types/todo'

interface IInput {
  name: string
  label?: string
  cl?: string
  type: string
  placeholder?: string
  value?: string
  register: UseFormRegister<INewProjectForm> | UseFormRegister<INewTodoForm>
  rules: { required: string | false }
}

export default function InputForm({ value, type, label, name, register, rules, cl, placeholder }: IInput) {
  return (
    <label className='label'>
      {label}
      <input
        // @ts-ignore
        {...register(name, rules)}
        placeholder={placeholder || label}
        type={type}
        name={name}
        defaultValue={value}
        className={`label__input ${cl || ''}`}
      />
    </label>
  )
}
