import styles from "@/styles/core/Nav.module.css";
import { NavLink } from "@/components/core/NavLink";

type AppNavProps = SimpleComponentProps;

export const AppNav = ({ className = "" }: AppNavProps) => {
  return (
    <nav className={className}>
      <NavLink href="/dashboard" className={styles.primaryNavLink}>
        Dashboard
      </NavLink>
      <NavLink href="/nickfrosty" className={styles.primaryNavLink}>
        Profile Example
      </NavLink>
    </nav>
  );
};
