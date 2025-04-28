
type IconBtnProps = {
  Icon: React.ComponentType<any>;
  isActive?: boolean;
  color?: string;
  children?: React.ReactNode;
  [x: string]: any;
};

export function IconBtn({ Icon, isActive=false, color="", children, ...props }: IconBtnProps) {
  return (
    <button
      className={`btn icon-btn ${isActive ? "icon-btn-active" : ""} ${
        color || ""
      }`}
      {...props}
    >
      <span className={`${children != null ? "mr-1" : ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  )
}
