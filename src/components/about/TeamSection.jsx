import Image from "next/image";
import { Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

const SOCIAL_LINKS = [
  {
    platform: "facebook",
    href: "https://facebook.com/rsintl",
    label: "Facebook",
  },
  {
    platform: "youtube",
    href: "https://youtube.com/@rs3dwallpaperfloor882",
    label: "YouTube",
  },
  {
    platform: "whatsapp",
    href: "https://wa.me/8801772132818",
    label: "WhatsApp",
  },
];

const TEAM = [
  { initials: "AH", name: "Abdul Halim", role: "Lead Installer" },
  { initials: "SR", name: "Sadia Rahman", role: "Interior Designer" },
  { initials: "MK", name: "Masud Khan", role: "Site Measurer" },
];

function SocialIcon({ platform, className = "w-4 h-4" }) {
  switch (platform) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function TeamSection() {
  return (
    <section id="team" className="scroll-mt-20 py-16 md:py-24 bg-white">
      <Container>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-12 md:mb-16">
          Meet the Founder
        </h2>

        <div className="max-w-2xl mx-auto rounded-2xl bg-light border border-light-muted/50 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden shrink-0 ring-4 ring-primary/20">
              <Image
                src="/founder.jpg"
                alt="Md. Rasel Khandaker — CEO & Founder of RS 3D Wallpaper & Floor"
                fill
                sizes="120px"
                className="object-cover object-center"
              />
            </div>

            <div className="text-center sm:text-left">
              <h3 className="text-xl font-heading font-bold text-dark">
                Md. Rasel Khandaker
              </h3>
              <Badge variant="secondary" size="sm" className="mt-2 mb-4">
                CEO & Founder
              </Badge>

              <p className="text-sm text-dark-muted leading-relaxed mb-5">
                Rasel Khandaker founded RS 3D Wallpaper & Floor in 2017 with a
                passion for transforming living spaces. With 7+ years of
                hands-on experience across thousands of projects, he leads every
                installation with a personal commitment to quality and customer
                satisfaction.
              </p>

              <a
                href="tel:+8801976600300"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors mb-4"
              >
                <Phone className="w-4 h-4" />
                01772-132818
              </a>

              <div className="flex items-center justify-center sm:justify-start gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white border border-light-muted text-dark-muted hover:text-primary hover:border-primary/30 transition-colors"
                    aria-label={social.label}
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-heading font-bold text-dark text-center mb-8">
            Our Team
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center rounded-xl bg-light p-6 border border-light-muted/50"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary/60 flex items-center justify-center mb-3">
                  <span className="text-sm font-bold text-dark">
                    {member.initials}
                  </span>
                </div>
                <p className="text-sm font-heading font-bold text-dark">
                  {member.name}
                </p>
                <Badge variant="outline" size="xs" className="mt-2">
                  {member.role}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
