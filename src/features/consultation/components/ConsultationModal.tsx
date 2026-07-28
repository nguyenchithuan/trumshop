import type { HomeCopy } from "@/features/home/components/HomePage";
import SocialIcon from "@/components/ui/SocialIcon";

type Channel = "zalo" | "facebook" | "instagram";
interface ConsultationModalProps { readonly content: HomeCopy; readonly message: string; readonly onChannel: (channel: Channel) => void; readonly onClose: () => void; }

export default function ConsultationModal({ content, message, onChannel, onClose }: ConsultationModalProps) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" type="button" aria-label={content.menuClose} onClick={onClose}>×</button><div className="modal-icon">T</div><p className="section-kicker">{content.modalKicker}</p><h2 id="modal-title">{content.modalTitle}</h2><div className="message-preview"><span>{content.message}</span><p>{message}</p></div><div className="modal-channels">{([ ["zalo", content.channels[0]], ["facebook", content.channels[1]], ["instagram", content.channels[2]] ] as const).map(([channel, label]) => <button type="button" className={`channel-${channel}`} key={channel} onClick={() => onChannel(channel)}><span><SocialIcon channel={channel} /></span>{label}<i>↗</i></button>)}</div><p className="modal-safety">{content.safety}</p></section></div>;
}
