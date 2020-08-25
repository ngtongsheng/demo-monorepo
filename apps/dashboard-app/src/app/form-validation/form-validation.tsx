import React from 'react';
import { mapObjIndexed, dissoc, pipe } from 'ramda';
import './form-validation.scss';
import { Input } from '@demo-monorepo/ui';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
}

export const FormValidation = () => {
  const { register, errors } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const cleaned = mapObjIndexed(pipe(dissoc('ref'), dissoc('message')))(errors);
  const code = JSON.stringify(cleaned, null, '\t');

  return (
    <div className="form-validation">
      <div className="title is-4">Form validation</div>
      <div className="content">
        <p>Simple form validation.</p>
      </div>
      <code>{code}</code>
      <form>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <Input
              className={errors.name && 'is-danger'}
              name="name"
              ref={register({
                required: true,
                maxLength: 15,
                minLength: 5,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {!errors.name && (
              <p className="help is-primary">
                Is required, min length is 5, max length 15, alphabet only
                without spacing
              </p>
            )}
            {errors.name?.type === 'required' && (
              <p className="help is-danger">This field is required.</p>
            )}
            {errors.name?.type === 'minLength' && (
              <p className="help is-danger">The max length is 5</p>
            )}
            {errors.name?.type === 'maxLength' && (
              <p className="help is-danger">The max length is 15</p>
            )}
            {errors.name?.type === 'pattern' && (
              <p className="help is-danger">Alphabet only without spacing</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormValidation;
