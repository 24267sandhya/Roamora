# ─────────────────────────────────────────────────────────────
# Roamora GCP Setup Script
# Run this ONCE to configure the project before first deploy.
# Project: travel-planner-495705
# ─────────────────────────────────────────────────────────────
# Usage (PowerShell):
#   .\infra\setup-gcp.ps1

$PROJECT_ID = "travel-planner-495705"
$REGION     = "asia-south1"
$REPO_NAME  = "roamora"

Write-Host "==> Setting active project..." -ForegroundColor Cyan
gcloud config set project $PROJECT_ID

Write-Host "==> Enabling required GCP APIs..." -ForegroundColor Cyan
gcloud services enable `
  run.googleapis.com `
  cloudbuild.googleapis.com `
  artifactregistry.googleapis.com `
  secretmanager.googleapis.com `
  aiplatform.googleapis.com

Write-Host "==> Creating Artifact Registry repository..." -ForegroundColor Cyan
gcloud artifacts repositories create $REPO_NAME `
  --repository-format=docker `
  --location=asia `
  --description="Roamora container images"

Write-Host "==> Configuring Docker auth for Artifact Registry..." -ForegroundColor Cyan
gcloud auth configure-docker asia-docker.pkg.dev

Write-Host "==> Creating GEMINI_API_KEY secret in Secret Manager..." -ForegroundColor Cyan
Write-Host "Paste your Gemini API key and press Enter:" -ForegroundColor Yellow
$API_KEY = Read-Host -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($API_KEY)
$PLAIN_KEY = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
$PLAIN_KEY | gcloud secrets create GEMINI_API_KEY `
  --data-file=- `
  --project=$PROJECT_ID

Write-Host "==> Granting Cloud Build SA access to Secret Manager..." -ForegroundColor Cyan
$PROJECT_NUMBER = (gcloud projects describe $PROJECT_ID --format="value(projectNumber)")
$CB_SA = "${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"
gcloud projects add-iam-policy-binding $PROJECT_ID `
  --member="serviceAccount:${CB_SA}" `
  --role="roles/secretmanager.secretAccessor"

Write-Host "==> Granting Cloud Build SA permission to deploy to Cloud Run..." -ForegroundColor Cyan
gcloud projects add-iam-policy-binding $PROJECT_ID `
  --member="serviceAccount:${CB_SA}" `
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID `
  --member="serviceAccount:${CB_SA}" `
  --role="roles/iam.serviceAccountUser"

Write-Host ""
Write-Host "==> Setup complete! Next steps:" -ForegroundColor Green
Write-Host "  1. When ready to deploy, run:"
Write-Host "     gcloud builds submit --config cloudbuild.yaml . --project=$PROJECT_ID"
Write-Host "  2. After first deploy, update NEXT_PUBLIC_BACKEND_URL in infra/frontend-service.yaml"
