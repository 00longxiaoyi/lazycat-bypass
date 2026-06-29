import { ExpandableInfoBlock } from "./ExpandableInfoBlock";

const ipv4ExitInfo = {
  title: "怎么获取 Lazycat 的 IPv4 出口信息？",
  items: [
    "如果和 Lazycat 在同一个局域网，在关闭所有代理的情况下访问 https://ip.sb",
    "在 Lazycat 上下载 netwatch 应用。"
  ]
};

type Ipv4ExitInfoProps = {
  defaultOpen?: boolean;
};

export function Ipv4ExitInfo({ defaultOpen = true }: Ipv4ExitInfoProps) {
  return (
    <ExpandableInfoBlock title={ipv4ExitInfo.title} defaultOpen={defaultOpen}>
      <ol className="list-decimal space-y-1 pl-5">
        {ipv4ExitInfo.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </ExpandableInfoBlock>
  );
}
