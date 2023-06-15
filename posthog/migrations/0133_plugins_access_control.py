# Generated by Django 3.0.6 on 2021-02-25 16:03

from django.contrib.postgres import fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("posthog", "0132_team_test_account_filters"),
    ]

    operations = [
        migrations.AddField(
            model_name="organization",
            name="plugins_access_level",
            field=models.PositiveSmallIntegerField(
                choices=[(0, "none"), (3, "config"), (6, "install"), (9, "root")],
                default=9,
            ),
        ),
        migrations.AddField(
            model_name="plugin",
            name="is_global",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="organization",
            name="personalization",
            field=fields.jsonb.JSONField(blank=True, default=dict),
        ),
        migrations.AlterField(
            model_name="team",
            name="app_urls",
            field=fields.ArrayField(
                base_field=models.CharField(max_length=200, null=True), blank=True, default=list, size=None
            ),
        ),
        migrations.AlterField(
            model_name="team",
            name="session_recording_retention_period_days",
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
