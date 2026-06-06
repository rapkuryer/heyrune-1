import cn from 'clsx'
import { Link } from 'components/link'
import Arrow from 'icons/arrow-diagonal.svg'
import s from './list-item.module.scss'

export const ListItem = ({
  className,
  title,
  source,
  href,
  visible,
  index,
}) => {
  return (
    <Link
      href={href}
      className={cn(className, s.item, visible && s.visible)}
      style={{ '--i': index }}
    >
      <div className={s.inner}>
        <div className={s.title}>
          <span className={s.text}>{title}</span>
          <Arrow className={s.arrow} />
        </div>
        <div className={s.source}>
          <span>{source}</span>
        </div>
      </div>
    </Link>
  )
}
