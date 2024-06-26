import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import { Input, Select, TextArea } from '@grafana/ui';

import { NotificationChannelOption } from '../../../types';

interface Props extends Pick<UseFormReturn<any>, 'register' | 'control'> {
  option: NotificationChannelOption;
  invalid?: boolean;
}

export const OptionElement = ({ control, option, register, invalid }: Props) => {
  const modelValue = option.secure ? `secureSettings.${option.propertyName}` : `settings.${option.propertyName}`;
  switch (option.element) {
    case 'input':
      return (
        <Input
          {...register(`${modelValue}`, {
            required: option.required ? 'Required' : false,
            validate: (v) => (option.validationRule !== '' ? validateOption(v, option.validationRule) : true),
          })}
          invalid={invalid}
          type={option.inputType}
          placeholder={option.placeholder}
        />
      );

    case 'select':
      return (
        <Controller
          control={control}
          name={`${modelValue}`}
          render={({ field: { ref, ...field } }) => (
            <Select {...field} options={option.selectOptions ?? undefined} invalid={invalid} />
          )}
        />
      );

    case 'textarea':
      return (
        <TextArea
          invalid={invalid}
          {...register(`${modelValue}`, {
            required: option.required ? 'Required' : false,
            validate: (v) => (option.validationRule !== '' ? validateOption(v, option.validationRule) : true),
          })}
        />
      );

    default:
      console.error('Element not supported', option.element);
      return null;
  }
};

const validateOption = (value: string, validationRule: string) => {
  return RegExp(validationRule).test(value) ? true : 'Invalid format';
};
