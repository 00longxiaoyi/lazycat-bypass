import { ExpandableInfoBlock } from "./ExpandableInfoBlock";
import { ipv6CheckInfo } from "../../data/ipv6CheckInfo";

type Ipv6CheckInfoProps = {
  defaultOpen?: boolean;
};

export function Ipv6CheckInfo({ defaultOpen = true }: Ipv6CheckInfoProps) {
  return (
    <ExpandableInfoBlock title={ipv6CheckInfo.title} defaultOpen={defaultOpen}>
      <p>{ipv6CheckInfo.description}</p>
      <ol className="list-decimal space-y-1 pl-5">
        {ipv6CheckInfo.links.map((link) => (
          <li key={link.href}>
            <a className="link link-primary" href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
          </li>
        ))}
      </ol>
    </ExpandableInfoBlock>
  );
}
