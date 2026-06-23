import { MapPin } from "lucide-react";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.074840796045!2d90.41834051002502!3d23.81593758616966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7d6c928a207%3A0x497d7dd3cb4ecd8c!2sRS%203D%20Wallpaper%20and%20Floor!5e0!3m2!1sen!2sbd!4v1699440588244!5m2!1sen!2sbd";

export default function MapSection() {
  return (
    <div id="map-section" className="scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-6">
        Find Our Office
      </h2>

      <div className="rounded-2xl overflow-hidden shadow-lg border border-light-muted/50">
        <iframe
          src={MAP_EMBED_URL}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="RS 3D Wallpaper and Floor office location"
          className="w-full"
        />
      </div>

      <div className="flex items-start gap-2 mt-4 text-sm text-dark-muted">
        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p>
          K-57/4, Kuril Chourasta, beside Jamuna Future Park, Pragati Sarani
          Road, Dhaka, Bangladesh
        </p>
      </div>
    </div>
  );
}
