import type { Timestamp } from '@cinema-microservices-nest/contracts/gen/google/protobuf/timestamp';

export class TimestampMapper {
	public static toISOString(
		timestamp?: Timestamp | null,
	): string | undefined {
		if (!timestamp) return undefined;

		const milliseconds =
			Number(timestamp.seconds) * 1000 +
			Math.floor(timestamp.nanos / 1_000_000);

		return new Date(milliseconds).toISOString();
	}
}
