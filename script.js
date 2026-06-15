const body = document.body;
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");
const enquiryForm = document.querySelector("[data-enquiry-form]");
const formNote = document.querySelector("[data-form-note]");

const galleryImages = [
  {
    src: "assets/properties/exhall-house/CBF4E1FB-F8FD-48CC-9186-873A8B455957_1_105_c.jpeg",
    alt: "Exhall House living room with tan corner sofa",
  },
  {
    src: "assets/properties/exhall-house/ADB5F6F1-A2F4-4B28-9C7B-B160E9B2FB1F_1_105_c.jpeg",
    alt: "Exhall House dining area with wooden table",
  },
  {
    src: "assets/properties/exhall-house/5C83E063-0C1E-4BEC-8B3D-209532BA1E94_1_105_c.jpeg",
    alt: "Exhall House compact kitchen with laundry facilities",
  },
  {
    src: "assets/properties/exhall-house/EFA6A4B8-0069-41C7-A700-817BEF8A1CBF_1_105_c.jpeg",
    alt: "Exhall House double bedroom with green feature wall",
  },
  {
    src: "assets/properties/exhall-house/D656C58B-7C37-47FD-8F1A-46EC9179BC42_1_105_c.jpeg",
    alt: "Exhall House double bedroom with teal wall",
  },
  {
    src: "assets/properties/exhall-house/5D86EB41-54F6-40C6-A86E-2D87680D9E08_1_105_c.jpeg",
    alt: "Exhall House twin bedroom with coral feature wall",
  },
  {
    src: "assets/properties/exhall-house/DF1E71F0-D0B8-4407-BA3F-3B2955340BE0_1_105_c.jpeg",
    alt: "Exhall House single bedroom with monochrome bedding",
  },
  {
    src: "assets/properties/exhall-house/05BAE84F-0D0D-4FC7-AE3C-6DA89BB8DF02_1_105_c.jpeg",
    alt: "Exhall House bathroom with walk-in shower",
  },
];

let activeGalleryIndex = 0;

function setNavOpen(isOpen) {
  body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
}

function openLightbox(index) {
  activeGalleryIndex = index;
  updateLightboxImage();
  lightbox.hidden = false;
  body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  body.style.overflow = "";
}

function updateLightboxImage() {
  const image = galleryImages[activeGalleryIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
}

function moveGallery(direction) {
  activeGalleryIndex = (activeGalleryIndex + direction + galleryImages.length) % galleryImages.length;
  updateLightboxImage();
}

navToggle.addEventListener("click", () => {
  setNavOpen(!body.classList.contains("nav-open"));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    setNavOpen(false);
  }
});

document.querySelectorAll("[data-gallery]").forEach((button) => {
  button.addEventListener("click", () => {
    openLightbox(Number(button.dataset.gallery));
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => moveGallery(-1));
lightboxNext.addEventListener("click", () => moveGallery(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setNavOpen(false);
    if (!lightbox.hidden) {
      closeLightbox();
    }
  }

  if (lightbox.hidden) {
    return;
  }

  if (event.key === "ArrowLeft") {
    moveGallery(-1);
  }

  if (event.key === "ArrowRight") {
    moveGallery(1);
  }
});

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!enquiryForm.reportValidity()) {
      return;
    }

    const formData = new FormData(enquiryForm);
    const details = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      type: formData.get("type") || "",
      dates: formData.get("dates") || "",
      guests: formData.get("guests") || "",
      message: formData.get("message") || "",
    };

    const subject = `Website enquiry - ${details.type || "S&S Properties"}`;
    const bodyLines = [
      "New website enquiry",
      "",
      `Name: ${details.name}`,
      `Email: ${details.email}`,
      `Phone: ${details.phone || "Not provided"}`,
      `Enquiry type: ${details.type}`,
      `Preferred dates: ${details.dates || "Not provided"}`,
      `Guests: ${details.guests || "Not provided"}`,
      "",
      "Message:",
      details.message || "Not provided",
    ];

    const mailto = new URL("mailto:SSpropertiesltd25@hotmail.com");
    mailto.searchParams.set("subject", subject);
    mailto.searchParams.set("body", bodyLines.join("\n"));

    window.location.href = mailto.toString();
    formNote.textContent = "Your email app should open with the enquiry ready to send.";
  });
}
