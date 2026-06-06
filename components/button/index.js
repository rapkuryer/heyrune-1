import cn from 'clsx'
import { Link } from 'components/link'
import Arrow from 'icons/arrow-buttons.svg'
import s from './button.module.scss'

export const Button = ({
  icon,
  arrow,
  children,
  href,
  onClick,
  className,
  style,
  type = 'button',
  disabled,
  ...props
}) => {
  return href ? (
    <Link
      href={href}
      className={cn(s.button, className, icon && s['has-icon'])}
      style={style}
      {...props}
    >
      {icon && <span className={s.icon}>{icon}</span>}
      <span className={s.text}>
        <span className={s.visible}>
          {children} {arrow && <Arrow className={s.arrow} />}
        </span>
        <span aria-hidden="true" className={s.hidden}>
          {children} {arrow && <Arrow className={s.arrow} />}
        </span>
      </span>
    </Link>
  ) : (
    <button
      type={type}
      disabled={disabled}
      className={cn(s.button, className, icon && s['has-icon'], disabled && s.disabled)}
      style={style}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={s.icon}>{icon}</span>}
      <span className={s.text}>
        <span className={s.visible}>
          {children} {arrow && <Arrow className={s.arrow} />}
        </span>
        <span aria-hidden="true" className={s.hidden}>
          {children} {arrow && <Arrow className={s.arrow} />}
        </span>
      </span>
    </button>
  )
}
