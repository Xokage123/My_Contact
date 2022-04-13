export interface InitialValues {
  [key: string]: string
}

export interface Props {
  title: string
  titleButton?: string,
  initialValues: InitialValues,
  onSubmit: (values: InitialValues) => void
  validationSchema: unknown
  inputs: Inputs[]
}

export interface Inputs {
  name: string
  title: string,
  placeholder: string
  type?: 'text' | 'tel'
}