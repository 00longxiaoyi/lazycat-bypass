type ShadowrocketConfigInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ShadowrocketConfigInput({ value, onChange }: ShadowrocketConfigInputProps) {
  async function handleFileChange(file: File | undefined) {
    if (!file) return;

    try {
      const text = await file.text();
      onChange(text);
    } catch {
      window.alert("读取文件失败，请手动粘贴配置内容");
    }
  }

  return (
    <div className="w-full space-y-3">
      <div className="space-y-2">
        <input
          className="file-input file-input-bordered w-full text-base"
          type="file"
          accept=".conf,.txt,.ini,text/plain"
          onChange={(event) => void handleFileChange(event.target.files?.[0])}
        />
      </div>
      <textarea
        className="textarea min-h-72 w-full text-base leading-6"
        placeholder="请粘贴 Shadowrocket 配置文件内容"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
