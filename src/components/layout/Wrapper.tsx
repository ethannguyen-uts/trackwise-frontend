interface WrapperInputProps {}

export const Wrapper: React.FC<WrapperInputProps> = (props) => {
  return <main className="mx-auto mt-8 w-full max-w-xl">{props.children}</main>
}
