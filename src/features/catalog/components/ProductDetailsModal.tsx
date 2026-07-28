"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { CatalogProduct, ProductDetail } from "@/features/catalog/data/catalog";
import type { Language } from "@/features/home/components/HomePage";

interface ProductDetailsModalProps {
  readonly detail: ProductDetail;
  readonly language: Language;
  readonly product: CatalogProduct;
  readonly onClose: () => void;
  readonly onContact: (product: CatalogProduct) => void;
}

export default function ProductDetailsModal({ detail, language, product, onClose, onContact }: ProductDetailsModalProps) {
  const isVietnamese = language === "vi";

  return <div className="modal-backdrop product-details-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="product-details-modal" role="dialog" aria-modal="true" aria-labelledby="product-details-title">
      <button className="modal-close" type="button" aria-label={isVietnamese ? "Đóng" : "Close"} onClick={onClose}>×</button>
      <header className="product-details-hero" style={{ "--product-accent": product.accent } as CSSProperties}>
        <div className="product-details-icon" aria-label={product.iconLabel}>{product.iconPath ? <Image alt="" height={36} src={product.iconPath} unoptimized width={36} /> : product.icon}</div>
        <div><p>{isVietnamese ? "HIỂU RÕ SẢN PHẨM" : "PRODUCT OVERVIEW"}</p><h2 id="product-details-title">{product.name[language]}</h2></div>
        {product.soldOut && <span className="sold-out-badge">{isVietnamese ? "Tạm hết hàng" : "Out of stock"}</span>}
      </header>

      <p className="product-details-overview">{detail.overview[language]}</p>
      <div className="product-details-grid">
        <section>
          <p className="product-detail-kicker">{isVietnamese ? "AI NÀY LÀM ĐƯỢC GÌ?" : "WHAT CAN IT DO?"}</p>
          <ul className="product-detail-list">
            {detail.capabilities[language].map((item) => <li key={item}><i>✦</i>{item}</li>)}
          </ul>
        </section>
        <section>
          <p className="product-detail-kicker">{isVietnamese ? "QUYỀN LỢI THEO GÓI" : "PLAN BENEFITS"}</p>
          <ul className="product-detail-list plan-benefit-list">
            {detail.planBenefits[language].map((item) => <li key={item}><i>✓</i>{item}</li>)}
          </ul>
        </section>
      </div>
      <p className="product-details-note"><i>◌</i>{detail.availabilityNote[language]}</p>
      <footer className="product-details-actions">
        {detail.officialUrl && <a href={detail.officialUrl} rel="noreferrer" target="_blank">{isVietnamese ? "Trang chính thức" : "Official website"}<b>↗</b></a>}
        <button className={product.soldOut ? "is-sold-out" : ""} disabled={product.soldOut} type="button" onClick={() => onContact(product)}>{product.soldOut ? (isVietnamese ? "Tạm hết hàng" : "Out of stock") : (isVietnamese ? "Liên hệ chọn gói" : "Contact to choose a plan")}<b>{product.soldOut ? "—" : "↗"}</b></button>
      </footer>
    </section>
  </div>;
}
