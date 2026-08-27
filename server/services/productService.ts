/**
 * Artify Sols Backend — Products, Services & Catalog Management Service
 */

import { db } from '../core/db';
import { ProductServiceItem } from '../types';

export class ProductService {
  /**
   * Lists products with optional filtering.
   */
  public listProducts(options?: {
    category?: string;
    type?: 'product' | 'service';
    status?: 'active' | 'draft' | 'archived';
    search?: string;
  }): ProductServiceItem[] {
    let all = Array.from(db.products.values());

    if (options?.status) {
      all = all.filter((p) => p.status === options.status);
    }
    if (options?.type) {
      all = all.filter((p) => p.type === options.type);
    }
    if (options?.category && options.category !== 'all') {
      all = all.filter((p) => p.category.toLowerCase().includes(options.category!.toLowerCase()));
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      all = all.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    return all;
  }

  /**
   * Retrieves a product by slug or ID.
   */
  public getProductBySlugOrId(identifier: string): ProductServiceItem | null {
    for (const p of db.products.values()) {
      if (p.id === identifier || p.slug === identifier) {
        return p;
      }
    }
    return null;
  }

  /**
   * Creates a new product catalog item.
   */
  public createProduct(
    payload: Omit<ProductServiceItem, 'id' | 'createdAt' | 'updatedAt'>
  ): ProductServiceItem {
    const id = db.generateId('prod');
    const now = new Date().toISOString();

    const slug =
      payload.slug ||
      payload.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const product: ProductServiceItem = {
      ...payload,
      id,
      slug,
      createdAt: now,
      updatedAt: now,
    };

    db.products.set(id, product);
    return product;
  }

  /**
   * Updates an existing product item.
   */
  public updateProduct(id: string, updates: Partial<ProductServiceItem>): ProductServiceItem {
    const existing = db.products.get(id);
    if (!existing) {
      throw new Error(`Product with ID "${id}" was not found.`);
    }

    const updated: ProductServiceItem = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    db.products.set(id, updated);
    return updated;
  }
}

export const productService = new ProductService();
