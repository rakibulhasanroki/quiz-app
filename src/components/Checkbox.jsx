// export default function Checkbox({ className, text, ...rest }) {
//   return (
//     <label className={className} {...rest} htmlFor="checkbox">
//       <input type="checkbox" {...rest} />
//       <span> {text}</span>
//     </label>
//   );
// }

export default function Checkbox({
  className,
  text,
  checked,
  onChange,
  ...rest
}) {
  return (
    <label className={className}>
      <input type="checkbox" checked={checked} onChange={onChange} {...rest} />
      <span> {text}</span>
    </label>
  );
}
