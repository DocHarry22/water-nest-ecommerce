# Fix broken Unsplash images
$replacements = @{
  'photo-1581092918484-8313e1f6d145' = 'photo-1563453392212-326f5e854473'
  'photo-1610724404688-b72f3cb5b6b8' = 'photo-1548839140-29a749e1cf4d'
  'photo-1582719201952-9c8d7cf5e5f1' = 'photo-1559827260-dc66d52bef19'
  'photo-1584622781867-f8178b0c2229' = 'photo-1581578731548-c64695cc6952'
  'photo-1625246333195-78d9c38ad449' = 'photo-1563453392212-326f5e854473'
  'photo-1581094794329-c8112a89af12' = 'photo-1581578731548-c64695cc6952'
  'photo-1532094349884-543bc11b234d' = 'photo-1559827260-dc66d52bef19'
  'photo-1504542132171-a86a3e5b0e6d' = 'photo-1530587191325-3db32d826c18'
  'photo-1558618666-fcd25c85cd64' = 'photo-1523413651479-597eb2da0ad6'
  'photo-1582719478250-c89cae4dc85b' = 'photo-1563453392212-326f5e854473'
  'photo-1621905251918-48416bd8575a' = 'photo-1559827260-dc66d52bef19'
  'photo-1532634922-8fe0b757fb13' = 'photo-1548839140-29a749e1cf4d'
  'photo-1504917595217-d4dc5ebe6122' = 'photo-1581578731548-c64695cc6952'
  'photo-1581092918056-0c4c3acd3789' = 'photo-1530587191325-3db32d826c18'
  'photo-1582719201952-bba43c9c4e77' = 'photo-1523413651479-597eb2da0ad6'
  'photo-1582719366941-a26f6f69c9af' = 'photo-1548839140-29a749e1cf4d'
  'photo-1563906267088-b029e7101114' = 'photo-1523413651479-597eb2da0ad6'
  'photo-1584622650111-993a426fbf0a' = 'photo-1548839140-29a749e1cf4d'
  'photo-1563694983011-6f4d90358083' = 'photo-1581578731548-c64695cc6952'
  'photo-1589931135738-14b4f5c3652c' = 'photo-1563453392212-326f5e854473'
  'photo-1460925895917-afdab827c52f' = 'photo-1472099645785-5658abf4ff4e'
}

Write-Host "Fixing broken Unsplash images..." -ForegroundColor Cyan
$fileCount = 0

Get-ChildItem -Path "src" -Recurse -Include *.tsx,*.ts -File | ForEach-Object {
  $content = [System.IO.File]::ReadAllText($_.FullName)
  $modified = $false
  
  foreach ($old in $replacements.Keys) {
    if ($content -match $old) {
      $content = $content -replace $old, $replacements[$old]
      $modified = $true
    }
  }
  
  if ($modified) {
    [System.IO.File]::WriteAllText($_.FullName, $content)
    Write-Host "Updated: $($_.Name)" -ForegroundColor Green
    $fileCount++
  }
}

Write-Host "`nFixed $fileCount files!" -ForegroundColor Green
