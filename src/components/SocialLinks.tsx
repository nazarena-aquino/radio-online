import { station } from "../config/station";
import type { SocialLink } from "../types";
import { ArrowUpRightIcon, InstagramIcon } from "./Icons";

function SocialIcon({ id }: { id: SocialLink["id"] }) {
  if (id === "instagram") return <InstagramIcon />;
  return <ArrowUpRightIcon />;
}

export function SocialLinks({ className = "" }: { className?: string }) {
  if (station.socials.length === 0) return null;

  return (
    <ul className={`social-links ${className}`.trim()}>
      {station.socials.map((social) => (
        <li key={social.id}>
          <a
            className="social-link"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.label} de Rock & Pop 90.7 FM (se abre en una pestaña nueva)`}
          >
            <SocialIcon id={social.id} />
            <span>{social.handle ?? social.label}</span>
            <ArrowUpRightIcon className="social-link__arrow" />
          </a>
        </li>
      ))}
    </ul>
  );
}
