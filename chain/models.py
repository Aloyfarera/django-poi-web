from django.db import models

class LpMaster(models.Model):
    chain_id = models.CharField(max_length=100)
    b_category = models.CharField(max_length=100)
    s_category = models.CharField(max_length=100)
    store_name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    tel_no = models.CharField(max_length=20)
    url_store = models.URLField()
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lon = models.DecimalField(max_digits=9, decimal_places=6)
    open_hours = models.CharField(max_length=100)
    services = models.CharField(max_length=255)
    scrape_date = models.DateField()

    class Meta:
        db_table = 'lp_master_tb'