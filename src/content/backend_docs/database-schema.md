---
title: Database Schema
description: Overview of the database structure and schema for the Open Graph Generator
order: 2
updated: 2023-05-22
---

# Database Schema

The Open Graph Generator uses SQLite to store information about image generations and track usage.

## Generations Table

The primary table `generations` stores information about each Open Graph image generation:

| Column        | Type      | Description                                            |
| ------------- | --------- | ------------------------------------------------------ |
| ID            | TEXT      | Unique identifier for the generation (UUID)            |
| Title         | TEXT      | The title used in the Open Graph image                 |
| Description   | TEXT      | The description used in the Open Graph image           |
| TargetURL     | TEXT      | The URL the Open Graph image points to                 |
| ImagePath     | TEXT      | Path to the generated image file                       |
| HTMLPath      | TEXT      | Path to the generated HTML with meta tags              |
| CreatedAt     | TIMESTAMP | When the generation was created                        |
| ClientIP      | TEXT      | IP address of the client that requested the generation |
| UserAgent     | TEXT      | User agent of the client that requested the generation |
| Parameters    | TEXT      | JSON string of additional parameters used              |
| Status        | TEXT      | Status of the generation (pending, completed, failed)  |
| cleanup_after | TIMESTAMP | When the generated files should be cleaned up          |

## Indexes

The database has the following indexes for performance:

- `idx_generations_id`: Index on the `ID` column for fast lookups
- `idx_generations_created_at`: Index on the `CreatedAt` column for sorting by time
- `idx_generations_cleanup_after`: Index on the `cleanup_after` column for the cleanup job

## Automatic Cleanup

Generated files and database records are automatically cleaned up after a configurable period (default: 24 hours). The cleanup process:

1. Finds all records where `cleanup_after` is before the current time
2. Deletes the associated image and HTML files
3. Removes the database record

This prevents unlimited storage growth and ensures temporary files are properly managed.
