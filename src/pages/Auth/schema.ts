import * as yup from 'yup';

import { schemaText } from 'const';

import { AUTH_FIELD } from 'api/type';

const authSchema = yup.object({
  [AUTH_FIELD.login]: yup.string().required(schemaText.required),
  [AUTH_FIELD.password]: yup.string().required(schemaText.required),
})

export default authSchema